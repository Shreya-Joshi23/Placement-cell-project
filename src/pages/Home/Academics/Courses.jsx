import React from 'react'
import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const content=[
    {
        "department":"Department of Computer Science and Engineering",
        "text":"At present four following programmers are running in the Department of Computer Science & Engineering.",
        "link":"https://www.hnbgu.ac.in/sites/default/files/2021-08/Syllabus%20B.%20Tech%20%28CSE%29%20Syllabus%202018_0.pdf"
    },
    {
        "department":'Department of Electronics and Communication Engineering',
        "text":"",
        "link":"https://www.hnbgu.ac.in/sites/default/files/2024-03/B.Tech%20Electronics%20and%20Communication%20Engineering%20Applicable%20for%202018-19%20batch%20and%20onwards.pdf"
    },
    {
        "department":"Department of Electrical and Instrumentation Engineering",
        "text":"Department of Instrumentation Engineering is currently running four year (Eight semesters) B. Tech. degree course in Electrical and Instrumentation Engineering (EIE). The curriculum of B. Tech. (Electrical and Instrumentation Engineering) focuses on Measurement and Control, Analog and Digital Circuit Design, Analytical, Biomedical and Process Control based Instrumentation. However, the students are provided opportunities to get exposure of other specialized fields such as, VLSI, Industrial Automation, Virtual Instrumentation, Digital Signal Processing, etc. The course aims to train the students to be employed in various industries/ organizations such as, process industries, automation based industries, power industries, PSUs, Government Organizations, etc. The curriculum also equips as well as encourages the students to pursue higher education and research. The department has well equipped laboratories to facilitate the learning, along with class teachings, through experiments and projects.",
        "link":"https://www.hnbgu.ac.in/sites/default/files/2024-03/3.%20Syllabus_B.%20Tech._Instrumentation%20Engg._2023-24%20batch%20and%20onwads.pdf"
    },
    {
        "department":"Mechanical Engineering",
        "text":"The Mechanical Engineering Department offers Four years Under Graduate programme in Bachelor of Technology (B.Tech)",
        "link":"https://www.hnbgu.ac.in/sites/default/files/2023-03/Mechanical%20Engg.%20Dept.%20syallabus%202020-21.pdf"
    },
    {
        "department":"Department of Information Technology",
        "text":"Department of Information Technology runs a B.Tech. course in Information Technology. The curriculum of B. Tech. (I.T.) focuses on Computer System, Computer Network and IT Product Design. However, students are provided opportunities to get exposure of other specialized fields such as Internet and Information Communication Technology. The course aims to train the students to be employed in various industries/ organization such as Communication Industries, Software Design and Development, IT sector, PSUs, Government Organizations etc. The curriculum also equips as well as encourages the students to pursue higher education and research.",
        "link":"https://www.hnbgu.ac.in/sites/default/files/2023-03/Syllabus-B.Tech_.-IT.pdf"
    }
]

const Courses = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>Courses</Typography>
        <Container>
        {
            content.map((ele,idx)=>{
                return <>
                    <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>{ele.department}</Typography>
                    <Typography>{ele.text}</Typography>
                    <Link to={ele.link}>Syllabus for {ele.department}</Link>
                </>
            })
        }
        </Container>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>For detailed Information, </Typography>
        <Link to="https://www.hnbgu.ac.in/school/engtechnology/computechnology/srinagar/about-department">School of Engineering and Technology Courses</Link>
    </Container>
  )
}

export default Courses
