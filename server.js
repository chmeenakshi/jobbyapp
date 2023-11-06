const express = require("express");
const mongoose = require("mongoose");
const {Jobs, JobDetails} = require("./models/jobs");
const cors = require("cors");
const app = express();

const JobbyUsersData = require("./models/jobbyUsers");
const port = 4447|| process.env.PORT




//sending data to db 

const addJobs = async () => {
  try {
    const jobDetail = new JobDetails({
      title:"Fullstack Developer",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      companyWebsiteUrl:   "https://about.google.com/",
      rating: 4,
      location:"Mumbai",
      packagePerAnnum:"15 LPA",
      jobDescription:"As a Frontend Engineer, you will be directly responsible for helping the evolution of enterprise design systems at Google. You will engineer solutions that create shareable web components to be used in enterprise products within the organization. You’ll support multiple different product areas. ",
      skills: [
        {
            name: "HTML 5",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/html-img.png"
            },
            {
            name: "CSS 3",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/css-img.png"
            },
            {
            name: "Javascript",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/javascript-img.png"
            },
            {
            name: "React JS",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/reactjs-img.png"
            },
            {
            name: "Redux",
            imageUrl: "https://assets.ccbp.in/frontend/react-js/jobby-app/redux-img.png"
        }
      ],

      lifeAtCompany: {
        description: "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
        imageUrl:  "https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png"
      },
      employmentType:"Full Time",
    });

    const savedJobDetail = await jobDetail.save(); // saceJobDetails._id
    // Create and save a Job document that uses the same _id as the JobDetail

    const job = new Jobs({
      _id: savedJobDetail._id, // Use the same _id as the JobDetail
      title:"Fullstack Developer",
      companyLogoUrl:"https://assets.ccbp.in/frontend/react-js/jobby-app/google-img.png",
      rating: 4,
      location:"Mumbai",
      packagePerAnnum:"20 LPA",
      jobDescription:"As a Frontend Engineer, you will be directly responsible for helping the evolution of enterprise design systems at Google. You will engineer solutions that create shareable web components to be used in enterprise products within the organization. You’ll support multiple different product areas. ",
      employmentType:"Full Time",
    });


    await job.save();
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
};

                  //addJobs()




   app.use(cors())//middle ware to acces node environment in any origin
   app.use(express.json());//add middleware to parse the json data

mongoose.connect('mongodb+srv://meenakshichitikila:meena1234@cluster0.af5dytt.mongodb.net/?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((error)=>console.log(error));

app.use("/auth", require("./routes/authRouters"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, ()=> console.log(`server running at${port}`));

