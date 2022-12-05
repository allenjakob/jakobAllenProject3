import {useState} from 'react';

const Form = ({getAnswer}) => {

    const [userChoice, setUserChoice] = useState('');
    
    const transferData = (e) => {
        e.preventDefault()
        // error preventing. stops locking in on the logo
        if (userChoice){
            getAnswer(e, userChoice)
        }
    }
    
    return(
        <form onSubmit={transferData}>
            <label htmlFor="whichPlayer">Choose a Hockey Player!</label>
            <select 
            id="whichPlayer" 
            name="whichPlayer"
            onChange={ (e) => setUserChoice(e.target.value) }
            required
            >
                {/* the values are specialized player IDs that each NHL player gets when they're drafted / first play a game. The API uses them to find that specific players data */}
                <option selected={true} value="0" disabled>Pick one:</option>
                <option value="8478402">Connor McDavid</option>
                <option value="8479318">Auston Matthews</option>
                <option value="8477934">Leon Draisaitl</option>
                <option value="8471675">Sidney Crosby</option>
                <option value="8471214">Alex Ovechkin</option>
            </select>
            <button>Lock it in!</button>
        </form>
    )
}


export default Form;




// const mcdavid = 8478402;
// const mathews = 8479318;
// const draisaitl = 8477934;
// const crosby = 8471675;
// const ovechkin = 8471214;