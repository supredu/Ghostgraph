import "./App.css";

function App() {
    const logoSpanStyle=sty
  return (
    <div className="container flex flex-col" >
        <div className="head">
            <div height="100%" className="headCenter">
                <nav className= "Navbar--main">
                    <div className="logobox">
                        <a className="logo">
                            <div height="40" width="40" className="icon">
                                <span style={{box-sizing:"border-box",display:block,overflow:hidden,width:initial,height:initial;background:none;opacity:1;border:0;margin:0;padding:0;position:absolute;top:0;left:0;bottom:0;right:0}}>
                                    <img alt="Kun Logo" src="./logo.png" decoding="async" data-nimg="fill" style={{position:"absolute",top:0,left:0,bottom:0,right:0,box-sizing:border-box,padding:0,border:none,margin:auto,display:block,width:0,height:0,min-width:100%,max-width:100%,min-height:100%,max-height:100%}}/>
                                </span>
                            </div>
                            <div data-testid="brand-name" className="marketname">
                                <svg fill="white" xmlns="http://www.w3.org/2000/svg" height="58" style="width:100px" viewBox="0 0 313 58" width="313" >
                                    <g id="Layer_1">
                                        <title>Layer 1</title>
                                        <text font-weight="bold" font-style="italic" transform="matrix(6.27469 0 0 2.01378 -551.81 -17.6611)" stroke="#ffffff"  text-anchor="start" font-family="'Rubik'" font-size="24" id="svg_2" y="33.61225" x="86.92808" stroke-width="0" fill="#000000">KUN</text>
                                    </g>
                                </svg>
                            </div>
                        </a>
                    </div>
                    <ul className="">

                    </ul>
                </nav>
            </div>
        </div>
    </div>
  );
}

export default App;
