import React from 'react'

function SignupForm() {
  const [ fullName, setFullName ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ error, setError ] = useState(null);

  return (
    <div className='w-full max-w-md bg-base-100'>
      <div className="card">
        <div className="card-body">

          <div className='text-center'>
            <h2 className='text-2xl font-semibold'>Login</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupForm