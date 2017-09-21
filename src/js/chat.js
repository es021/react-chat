import React from 'react';

class ChatItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var time = "";

        if (this.props.type !== "center") {
            try {
                var time_temp = this.props.time.split(" ");
                time = time_temp[0].split(":");
                time = time[0] + ":" + time[1] + " " + time_temp[time_temp.length - 1];
            } catch (err) {
                //console.log(err);
                time = this.props.time;
            }
        }

        return (
                <div className="chat_item">
                    <div className={"chat_item_box " + this.props.type}>
                        <div className="message">{this.props.message}</div>
                        {(this.props.type === "center") ? "" : <div className="timestamp">{time}</div>}
                    </div>
                </div>
                );
    }
}

import ChatService from './service.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.NAME_SELF = "Wan Zulsarhan";
        this.NAME_OTHER = "Siti Huwaida";

        this.chatService = new ChatService();

        var page = this.getSavedPage();
        this.state = {
            items: [],
            page: page,
            is_load_more: false,
            first_id: undefined,
            first_page: page + 1
        };

        this.date = null;
        this.bindEvent();
    }

    getSavedPage() {

        var saved_page = window.localStorage.getItem("saved_page");
        if (saved_page === null) {
            saved_page = 0;
            window.localStorage.setItem("saved_page", saved_page);
        } else {
            saved_page = Number(saved_page);
            saved_page--;
        }

        window.localStorage.clear("saved_page");

        return saved_page;
    }

    bindEvent() {
        this.appendViewItem = this.appendViewItem.bind(this);
        this.appendNextPage = this.appendNextPage.bind(this);
        this.prependPrevPage = this.prependPrevPage.bind(this);
        this.searchChat = this.searchChat.bind(this);
        this.getSavedPage = this.getSavedPage.bind(this);
        this.addPage = this.addPage.bind(this);
        this.updateFirstId = this.updateFirstId.bind(this);
    }

    componentDidMount() {
        this.appendNextPage();
    }

    //TODO
    searchChat() {
        this.chatService.search("waida", function (res) {
            console.log(res);
        }, function (err) {
            console.log(err);
        });
    }

    appendNextPage() {
        this.addPage();
    }

    updateFirstId() {
        var id = undefined;
        if (this.state.items.length > 0) {
            for (var i in this.state.items) {
                id = this.state.items[i].props.id;
                if (id !== undefined) {
                    break;
                }
            }
        }

        this.setState(() => ({
                first_id: id
            }));
    }

    prependPrevPage() {
        this.addPage(true);
    }

    getFirstItemId() {
        this.state.items[0].props.id;
    }

    addPage(prev) {
        if (typeof prev === "undefined") {
            prev = false;
        }

        var obj = this;
        obj.setState(() => ({
                is_load_more: true
            }));

        //var page = this.state.page + 1;

        var page = 0;
        if (!prev) {
            page = this.state.page + 1;
        } else {
            page = this.state.first_page - 1;
        }


        this.chatService.getByPage(page, function (res) {
            for (var i in res) {
                var r = res[i];
                if (r.sender === obj.NAME_SELF) {
                    res[i]["type"] = "self";
                } else if (r.sender === obj.NAME_OTHER) {
                    res[i]["type"] = "other";
                }
            }
            addPageHandler(res);
        }, function (err) {
            console.log(err);
        });

        //run after chatService return response
        function addPageHandler(data) {
            if (data.length <= 0) {
                return false;
            }

            window.localStorage.setItem("saved_page", page);

            if (!prev) {
                for (var i in data) {
                    obj.appendViewItem(data[i]);
                }
            } else {
                for (var i = data.length - 1; i >= 0; i--) {
                    obj.appendViewItem(data[i], prev);
                }
            }

            if (!prev) {
                obj.setState((prevState) => ({
                        page: prevState.page + 1,
                        is_load_more: false
                    }));
            } else {
                obj.setState((prevState) => ({
                        page: prevState.page + 1,
                        first_page: prevState.first_page - 1,
                        is_load_more: false
                    }));
            }
        }
    }

    appendViewItem(data, prev) {
        if (typeof prev === "undefined") {
            prev = false;
        }

        if (this.date !== data.date) {
            var date = {};
            date["key"] = this.state.items.length + 1;
            date["type"] = "center";
            date["message"] = data.date;
            if (!prev) {
                this.state.items.push(React.createElement(ChatItem, date));
            } else {
                this.state.items.unshift(React.createElement(ChatItem, date));
            }

            this.date = data.date;
        }

        data["key"] = this.state.items.length + 1;
        if (!prev) {
            this.state.items.push(React.createElement(ChatItem, data));
        } else {
            this.state.items.unshift(React.createElement(ChatItem, data));
        }

        this.setState((prevState) => ({
                items: prevState.items
            }));

        this.updateFirstId();
    }

    render() {
        return(<div className="chat">
        
            {this.state.first_id > 1 ?
                                !this.state.is_load_more ?
                            <div className="control">
                                <a className="small_link" onClick={this.prependPrevPage}>Load More</a>
                            </div>
                                :
                            <div className="loading">
                                Loading..
                            </div>
                                : ""}
        
            {this.state.items}
        
            {!this.state.is_load_more ?
                            <div className="control">
                                <a className="small_link" onClick={this.appendNextPage}>Load More</a>
                            </div>
                                :
                            <div className="loading">
                                Loading..
                            </div>
            }
        
        </div>);
    }
}

module.exports = Chat;