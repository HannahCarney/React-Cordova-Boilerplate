// import React from "react";
// // import Listings from "./listings"
// // import Content from "./content"

// const urls = [
//   "https://www.washingtonpost.com/news/the-switch/wp/2017/10/17/googles-pixel-2-gives-you-the-best-of-android-if-you-can-find-it/?utm_term=.dacb8f419a4b",
//   "https://arstechnica.com/gadgets/2017/10/windows-10-fall-creators-update-lots-of-small-changes-and-maybe-the-revolution/",
//   "https://www.theverge.com/2017/10/17/16481628/microsoft-surface-book-2-price-release-date-specs-availability-processor"
// ];

// export default class MainWebView extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       selectedUrl: urls[0],
//       urls: urls,
//       content: "TBD"
//     }
//   }

//   onUrlSelect = (e, url) => {
//     e.preventDefault();
//     //console.log("selected Url Index: ", url);
//     this.setState({selectedUrl: url});

//   }

//   componentWillMount() {
//     this.loadData('http://192.168.150.240:4001');
//   }

//   loadData = (url) => {
//     fetch(url)
//       .then(function (response) {
//         console.log(url + " -> " + response.ok);
//         return response.body;
//       })
//       .then(function (data) {
//         console.log("data: ", data);
//         this.setState({ content: data });
//       }.bind(this))
//       .catch(function (err) {
//         console.log("failed to load ", url, err.stack);
//       });
//   }

//   render() {
//     return (
//       <div>
//         {/* <Listings urls={this.state.urls} onUrlSelect={this.onUrlSelect}/> */}
//         <div data={this.state.data}></div>
//       </div>
//     )
//   }
// } 