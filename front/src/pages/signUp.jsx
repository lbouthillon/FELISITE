import React, { Component } from 'react';
import {
  Segment, Loader, Card, Icon, Input,
} from 'semantic-ui-react';
import Register from "../components/auth/register.component"

export default class SignUp extends Component {

  constructor(props) {
    super(props);
  }


  
//   fetchData = (offset) => {
//     axios({
//       method: 'get',
//       url: `${config.back_Url}/activity`,
//       headers: { Token: localStorage.getItem('killerToken') },
//       params: {
//         offset,
//       },
//     }).then((data) => {
//       if (data.data.status === 200) {
//         const value = this.state.val.toLowerCase();
//         const search = [];
//         const arr = [
//           ...this.state.activities,
//           ...data.data.object,
//         ];

//         arr.forEach((activity) => {
//           if (activity.name.toLowerCase().indexOf(value) > -1) {
//             search.push(activity);
//           }
//         });

//         if (data.data.object.length === 10) {
//           this.setState({
//             loading: true,
//             activities: arr,
//             search,
//           });
//           this.fetchData(offset + 10);
//         } else {
//           this.setState({
//             activities: arr,
//             search,
//             loading: false,
//           });
//         }
//       }
//     });
//   }

  // handleChange = (event, data) => {
  //   const value = data.value.toLowerCase();
  //   const search = [];
  //   this.state.activities.forEach((activity) => {
  //     if (activity.name.toLowerCase().indexOf(value) > -1) {
  //       search.push(activity);
  //     }
  //   });
  //   this.setState({
  //     search,
  //     val: data.value,
  //   });
  // }

  // handleChangeSort = (event) => {
  //   this.setState({
  //     sort: event.target.value,
  //   });
  // }


  render() {
    return (
      <div className="bodyDesktop" >
        <Segment style={{backgroundColor: '#222222'}}>
          <Register/>
        </Segment>
        <div className="spacer" />
      </div>
    );
  }
}