import {toast} from 'sonner';

const LoginScreen = () => (
  <div>
    <button
      onClick={() => toast.error('My first toast', {description: 'Supporting this flow'})}
      type="button"
    >
      SHOW TOAST
    </button>
  </div>
);

export default LoginScreen;
