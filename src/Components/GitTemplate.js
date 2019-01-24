import React, { Component } from 'react';
import axios from 'axios';
import './GitTemplate.css'

const API = 'https://api.github.com/users/';
class GitTemplate extends Component{

    state = {
        data:{},
        loading:false, 
        lastSearches: []       
      };
      
    componentDidMount() {
       this.getGithubData(this.props.value)
    }
    getGithubData=(username)=>{
        const data = this.state.data;
        // var newArray = this.state.lastSearches.slice();    
      
        if(username){
            this.setState({loading: true})
          
            const something = this.state.lastSearches.filter(user => user.login === data.login);
            if(something.length === 0) {
                const newArray = [...this.state.lastSearches, data]
                if(newArray.length > 5){
                    newArray.splice(1, 1);
                }
                this.setState({lastSearches: newArray}) 
            }


           //  console.log("getting data time:"+test)
            
            axios.get(API+username) 
            .then((response) => {
            
               // console.log(response.data)
                this.setState({data: response.data});
                this.setState({loading: false})
            })
            .catch(function (error) {
                console.log(error);
            });      
        
    }
    }
    componentWillReceiveProps(nextProps){
        // console.log("im here: componentWillReceiveProps")
        if (nextProps.value !== this.props.value) {
            console.log("im here: componentWillReceiveProps nextProps")
            this.setState({ username: nextProps.value });
            this.getGithubData(nextProps.value)
          }
    }  

    updateMessage() {
            this.setState({
                username: this.state.username ? this.state.username:""
            });   
    }


    changeUser = (user) => {
        const alreadyExists = this.state.lastSearches.filter(last => last.login === this.state.data.login);
        let newArray; 
        if(alreadyExists.length === 0) {
            newArray = [...this.state.lastSearches, this.state.data]
        } else {
            newArray = this.state.lastSearches;
        }

        const nextArr = newArray.filter(last => last.login !== user.login);

        this.setState({ data: user, lastSearches: nextArr })
    }

    render() {

        console.log("#######", this.state)

        if(this.state.loading){
            return(
                <div className="AllContent">
                    <div className="MainContent">
                    <div className="loader"></div>
                    </div>
                </div>
                )
        }else if(this.props.value){
            const data=this.state.data;
        return(
            <div className="AllContent">
                <div className="MainContent">
                    <div><p>{data.login}</p></div>
                    <img className="imgcss" src={data.avatar_url} alt=""></img>
                    <div><p>Name: {data.name}</p><p>Location: {data.location}</p><p>Followers: {data.followers}</p></div>
                    <div><p>Last searches: </p></div>
                    <div>
                    {
                        this.state.lastSearches.map(user => {
                            if(user && user.login) {
                                return (
                                    <img key={user.login} className="imgsmallcss" src={user.avatar_url} alt=""
                                    onClick={() => this.changeUser(user)}></img>
                                )
                            }   
                            return null;
                        })
                    }
                    </div>
                    
                </div>
            </div>
        )}else{
                return(
                <div className="AllContent">
                    <div className="MainContent">
                        <div className="Empty"><p>Search for username..</p></div>
                    </div>
                </div>
                )
            
        }
    }
}
export default GitTemplate