import { Logo, FormRow , SubmitBtn} from '../component';
import { Link,Form,redirect, useNavigate} from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import customFetch from '../utils/customFetch.js'
import { toast } from 'react-toastify';
 
export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)
  try {
     await customFetch.post('auth/login', data)
     toast.success('Login Successful')
     return redirect ('/dashboard')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const Login = () => {
  
    const navigate = useNavigate();
    const loginDemoUser = async () => {
      const data = {
        email: 'test@test.com',
        password: 'test1234',
      };
      try {
        await customFetch.post('/auth/login', data);
        toast.success('take a test drive');
        navigate('/dashboard');
      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Login</h4>
        <FormRow type='email' name='email' placeholder="rahul@gmail.com" />
        <FormRow type='password' name='password' placeholder='Itsyour123' />
        <SubmitBtn formBtn />
        <button type='button' className='btn btn-block'
        onClick={loginDemoUser}>
          explore the app
        </button>
        <p>
          Not a member yet?
          <Link to='/register' className='member-btn'>
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Login;