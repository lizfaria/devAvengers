import React from "react";

class Footer extends React.Component {
    render() {
        return (
            <footer className="">
                <div className="wrapper clearfix">
                    <p className="developers"> 
                        <a href="http://www.pbassi.com" target="_blank"> Paul Bassi</a>, 
                        <a href="http://www.liyinglim.com" target="_blank"> Li Ying Lim</a>, and 
                        <a href="http://www.lizfaria.ca" target="_blank"> Liz Faria</a>
                    </p>
                    <div className="daredevilContainer">
                        <img src="../../assets/daredevil.png" alt="" className="daredevil"/>
                    </div>
                    <p className="attribution">Data provided by Marvel. © 2014 <span>Marvel</span></p>
                </div>
            </footer>
        )
    }
}

export default Footer;