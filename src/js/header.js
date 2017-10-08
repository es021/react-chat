import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
                <header>
                    <div className='title'>Our Chat</div>                    
                    <div className='subtitle'>Recreate From Our Whatsapp Conversation</div>                    
                </header>
                );
    }
}

module.exports = Header;