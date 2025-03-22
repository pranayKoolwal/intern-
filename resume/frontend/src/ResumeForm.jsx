import { useRef, useState } from "react";
import axios from "axios";

function ResumeForm() {
    const [formData, setFormData] = useState({ name: "", email: "", skills: [], education: '', exp: "" , additional:[] });
    const [handlingSkills, setskills] = useState(formData.skills.length);
    // const ref = useRef()
    const [additional, setAdditional] = useState(formData.additional.length 
    );
    const [keyState, setKeyState] = useState('');
    const handleChange = (e) => {
        console.log(e.target.name);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const response = await axios.post("http://localhost:5000/generate-resume", {
            name: formData.name,
            email: formData.email,
            skills: formData.skills,
            education: formData.education,
            exp: formData.exp,
            additional:formData.additional 
        }, { responseType: "blob" });

        // Create a link to download the PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${formData.name}resume.pdf`);
        document.body.appendChild(link);
        link.click();
        alert("Resume started downloaded successfully!");
    };

    return (
        <>
            <div className="container">
                <div className="card" >
                    <div className="card-image">
                        <h2 className="card-heading">
                            Get started
                            <small>Let us create your resume</small>
                        </h2>
                    </div>
                    <form className="card-form" onSubmit={handleSubmit}>
                        <div className="input">
                            <input
                                type="text"
                                name="name"
                                className="input-field"
                                value={formData.name}
                                placeholder="Enter your full name"
                                required=""
                                onChange={handleChange}
                            />
                            <label className="input-label">Full name</label>
                        </div>
                        <div className="input">
                            <input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                className="input-field"
                                value={formData.email}
                                placeholder="Enter your email"
                                required=""
                            />
                            <label className="input-label">Email</label>
                        </div>
                        <div className="input">
                            <input type="datetime-local"
                              style={{color:"grey"}}
                                onChange={handleChange}
                                name="dob"
                                className="input-field"
                                value={formData.dob}
                                placeholder="Enter your date of birth"
                                required="" />
                            <label className="input-label">Date-Of-Birth</label>
                        </div>
                        <div className="input">
                            <textarea
                                className="input-field"
                                name="education"
                                value={formData.education}
                                placeholder="Enter your education details"
                                onChange={handleChange}
                            ></textarea>
                            <label className="input-label">Education</label>
                        </div>
                        <div className="input">
                            <textarea
                                className="input-field"
                                name="exp"
                                value={formData.exp}
                                placeholder="Enter your experience details"
                                onChange={handleChange}
                            />
                            <label className="input-label">experience</label>
                        </div>
                        <div className="input">
                            {/* <label className="input-label ">skills</label> */}
                            <button type="button"
                            
                            style={{  background:"#6658d3",borderRadius:"10px",color:"white",border:"none",padding:"10px 5px ",cursor:"pointer"}}
                            onClick={() => setskills(handlingSkills + 1)}>Add Skill section</button>
                            <div>
                                {Array.from({ length: handlingSkills }, (_, index) => `${index + 1}`).map((value) => {
                                    return (
                                        <>
                                            <div className="input" style={{marginBottom:"10px"}} >
                                                <input type="text" className="input-field"
                                                    value={formData.skills[value - 1] || ""}
                                                    placeholder={`Enter skill ${value}`}
                                                    onChange={(e) => {
                                                        setFormData((pre) => {
                                                            let data = { ...pre };
                                                            data.skills[value - 1] = e.target.value;
                                                            return data;
                                                        });
                                                    }}
                                                />
                                                <label className="input-label">skill {" "+value}</label>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="input">
                            {/* <label className="input-label "></label> */}
                            <button type="button"
                            style={{  background:"#6658d3",borderRadius:"10px",color:"white",border:"none",padding:"10px 5px ",cursor:"pointer"}}
                            onClick={() => setAdditional(additional + 1)}>Add Additional section</button>
                            <div>
                                {Array.from({ length: additional }, (_, index) => `${index + 1}`).map((value) => {
                                    return (
                                        <>
                                            <div className="input"  style={{marginBottom:"10px"}}>
                                             
                                                <input className="input-field"
                                                placeholder="Enter the field description"
                                                style={{marginBottom:"10px"}}
                                                onChange={(e)=>{
                                                      setFormData((pre)=>{
                                                        
                                                        let data = {...pre}
                                                        // console.log(ref.current.value)
                                                        console.log(keyState , 'keyState')
                                                        data.additional[value-1] = {field:keyState , value:e.target.value};
                                                        return data;
                                                      })
                                                }}/>

                                                   <input type="text" 
                                                   style={{marginBottom:"15px"}}
                                                   placeholder="Enter the field Name"
                                                   className="input-field"
                                                
                                                onChange={(e)=>setKeyState(e.target.value)}                                                    
                                                />
                                                <label className="input-label"
                                                >Additional {" "+value}</label>
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        
                        <div className="action">
                            <button className="action-button">Get started</button>
                        </div>
                    </form>
                    <div className="card-info">
                        <p>
                            By signing up you are agreeing to our{" "}
                            <a href="#">Terms and Conditions</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ResumeForm;
