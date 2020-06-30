import React, {useEffect} from 'react';

const Dashboard = ({userProfile}) => {


    useEffect(() => {
        console.log(userProfile);
    })

    return (
        <h1>Dashboard</h1>
    );
    
}


export default Dashboard;