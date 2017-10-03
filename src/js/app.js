import React from 'react';
import Chat from './chat.js';
import Header from './header.js';
import Footer from './footer.js';

class App extends React.Component {
    render() {
        return(<div>
            <div className="app">
                <Header />
                <content>
                    <Chat />
                </content>
                <Footer />        
            </div>
        </div>);
    }
};

//can export more than one
module.exports = App;

