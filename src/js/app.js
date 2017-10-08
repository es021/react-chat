import React from 'react';
import Chat from './chat.js';
import Header from './header.js';
import Footer from './footer.js';

class App extends React.Component {
    render() {
        return(<div>
            <Header />
            <content>
                <Chat />
            </content>
        
            <Footer />  
            <div className="background"></div>

        </div>);
    }
}
;

//can export more than one
module.exports = App;

