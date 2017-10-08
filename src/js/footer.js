import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        var iconStyle = {
            marginLeft: '4px',
            color: "red",
            opacity: "1"
        };

        return(
                <footer>
                    <div className ="text">
                        Made With <i style={iconStyle} className="fa fa-heart"></i>
                    </div>
                </footer>
                );
    }
}

module.exports = Footer;
