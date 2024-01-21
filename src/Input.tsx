import './Input.css';
import {useForm} from 'react-hook-form';

export interface props{
    type: string
    placeholder?: string
    id: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string | number
    label?: string
}
const Input = (props: props) => {
    return(
        <div>
            <label>{props.label}</label>
            <input className='CC' type={props.type} placeholder={props.placeholder} id={props.id} value={props.value} onChange={props.onChange}/>
        </div>
        
    )
}

export default Input;