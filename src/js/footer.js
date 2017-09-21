import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(<footer>
            This is footer                    
            <i className="fa fa-heart"></i>
        </footer>);
    }
}

module.exports = Footer;
