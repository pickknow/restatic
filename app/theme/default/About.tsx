import { Link } from '@remix-run/react'

export function About() {
  const recipient = 'sovso.v@gmail.com';
  const subject = 'Inquiry about ... ';
  const body = 'Hello, I would like to know about ...';

  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <div className=" sm:flex sm:flex-col  sm:min-h-[800] gap-8 p-2 mt-8 pt-8" >
      {/* <div className="sm:w-full flex sm:flex-row justify-center mt-[40px]">
        <div className="sm:w-1/2">
          <h1 className="text-6xl">
            25+ years of building Opera
          </h1>
        </div>
        <div className="sm:w-1/2">
          <h1>
            For over 25 years, we've been building the best teams, audiences and online experiences.
          </h1>
        </div>
      </div> */}

      <div className="sm:w-full  mt-[100px] flex flex-col sm:grid sm:grid-cols-4 gap-8 ">
        <div className=" flex flex-col justify-between flex-start bg-[#f2f5f8] h-96 min-h-[200px] rounded-3xl p-5">
          <h3 className="flex text-3xl items-center  before:top-0 before:inline-block before:w-4 before:min-w-4 before:min-h-[3.2rem] before:bg-[#58c095] before:rounded-[2rem] relative">
            Love Coding
          </h3>
          <div className="text-lg">
        It’s like cooking. Blend logic and creativity, craft something amazing. When it’s done, like a perfect dish, 
        I savor the result. Simple script or big app, the thrill’s the same.
          </div>
        </div>
        <div className=" flex flex-col justify-between flex-start bg-[#f2f5f8] h-96 min-h-[200px] rounded-3xl p-5">
          <h3 className="flex text-3xl items-center  before:top-0 before:inline-block before:w-4 before:min-w-4 before:min-h-[3.2rem] before:bg-[#2e78f6] before:rounded-[2rem] relative">
           Skills 
          </h3>
          <div>
            PHP,Node.js, Python, React, Vue, Next.js, Laravel, Docker, Git, AWS, Express, MySQL, MongoDB, Redis,Html, Css, Javascript,
            more...
            
          </div>
        </div>
        <div className=" flex flex-col justify-between flex-start bg-[#f2f5f8] h-96 min-h-[200px] rounded-3xl p-5">
          <h3 className="flex text-3xl items-center  before:top-0 before:inline-block before:w-4 before:min-w-4 before:min-h-[3.2rem] before:bg-[#e24c5e] before:rounded-[2rem] relative">
          Creativeness
          </h3>
          <div>
            I love to create new things. Whether it’s a new app, a new feature, or a new way to use an existing app, I’m always up for a challenge.
          </div>
        </div> 
        <div className=" flex flex-col justify-between flex-start bg-[#f2f5f8] h-96 min-h-[200px] rounded-3xl p-5">
          <h3 className="flex text-3xl items-center  before:top-0 before:inline-block before:w-4 before:min-w-4 before:min-h-[3.2rem] before:bg-[#aa78df] before:rounded-[2rem] relative">
          Experience
          </h3>
          <div>
           10 years of experience in building software. Including web apps, mobile apps, and desktop apps.
            I have worked with many different technologies and frameworks.
          </div>
        </div>
      </div>
<div className="mt-10 justify-center">
  <div className="justify-center flex items-center">
    <Link to={mailtoUrl}>
      <button className="btn btn-primary">Contact Me</button>
    </Link>
  </div>

</div>



    </div>

  )

}
