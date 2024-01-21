import * as yup from 'yup';

export const userSchema = yup.object().shape({
    name: yup.string().required("Missing UserName"),
    email: yup.string().email("Invalid Email").required("Missing Email"),
    number: yup.string().matches(/^\d{11}$/).required("Missing Number"),
    Password: yup.string().min(8).max(16).required("Missing Password"),
}).required();
