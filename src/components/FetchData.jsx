import React, {  useState } from 'react';


class FetchData extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
 
        this.state = {
            items: [],
            DataisLoaded: false,
        };
    }
 
    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch("http://localhost:8080/api/prayertimes")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true,
                });
            });
    }
    render() {
        const { DataisLoaded, items } = this.state;
        // if (!DataisLoaded)
        //     return (
        //         <div>
        //             <h1> Pleses wait some time.... </h1>
        //         </div>
        //     );
 
        return (
            <div className="App">
                {/* <h1 >GeeksforGeeks</h1>
                <h3>Fetch data from an api in react</h3> */}
                {/* <div className="container">
                    {items.map((item) => (
                        <div className="item">
                            <ol key={item.id}>
                                <div>
                                    <strong>
                                        {"Sunrise: "}
                                    </strong>
                                    {item.Sunrise},
                                </div>
                                <div>
                                    Fajr: {item.Fajr},
                                </div>
                                <div>
                                    Dhuhr: {item.Dhuhr}
                                </div>
                                <div>
                                Asr: {item.Asr}
                                </div>
                                <div>
                                Maghrib: {item.Maghrib}
                                </div>
                                <div>
                                Isha: {item.Isha}
                                </div>
                            </ol>
                        </div>
                    ))}
                </div> */}
            </div>
        );
    }
}
 
export default FetchData;