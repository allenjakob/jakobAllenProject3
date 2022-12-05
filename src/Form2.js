import {useState} from 'react';

const Form = ({getAnswer2}) => {

    const [userChoice, setUserChoice] = useState('');


    const transferData = (e) => {
        e.preventDefault()
        if (userChoice){
            getAnswer2(e, userChoice)
        }
    }

    return(
        <form onSubmit={transferData}>
            <label htmlFor="whichPlayer">Choose a type of Stat!</label>
            <select 
            id="whichPlayer" 
            name="whichPlayer" 
            onChange={ (e) => setUserChoice(e.target.value)}
            >
                <option selected={true} value="" disabled>Pick one:</option>
                <option value="goals">Goals</option>
                <option value="assists">Assists</option>
                <option value="points">Points</option>
                <option value="hits">Hits</option>
                <option value="pim">Penalty Minutes</option>
            </select>
            <button>Lock it in!</button>
        </form>
    )
}


export default Form;