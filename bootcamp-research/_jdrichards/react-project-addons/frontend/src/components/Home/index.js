import { useSelector } from 'react-redux';

const Home = () => {
  const sessionUser = useSelector((state) => state.session.user);
  console.log(sessionUser);

  return (
    <div>
      {sessionUser ? (
        <h1>Welcome {sessionUser.username}</h1>
      ) : (
        <h1>Hello Please Sign Up or Log In</h1>
      )}
    </div>
  );
};
export default Home;
