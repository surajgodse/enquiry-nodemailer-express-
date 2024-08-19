import { useState, useRef } from "react";
import axios from "axios";

export default function Enquiry() {
  const rName = useRef();
  const rPhone = useRef();
  const rQuery = useRef();
  const rEmail = useRef(); // Fixed: Use useRef for email input

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState(""); // Fixed: Managing email state with useState
  const [msg, setMsg] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const hName = (event) => { setName(event.target.value); }
  const hPhone = (event) => { setPhone(event.target.value); }
  const hQuery = (event) => { setQuery(event.target.value); }
  const hEmail = (event) => { setEmail(event.target.value); } // Fixed: Define hEmail for handling email input

  const save = (event) => {
    event.preventDefault();
    let data = { name, phone, query, email }; // Ensure email is included in the data
    let url = "http://localhost:9000/save";
    axios.post(url, data)
      .then(res => {
        console.log(res.data);
        setMsg("Thank you for your enquiry! We will get back to you shortly.");
        setShowMessage(true);
        setName("");
        setEmail("");
        setPhone("");
        setQuery("");
        rName.current.focus();

        // Refresh page after 3 seconds
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
      .catch(err => setMsg("Issue: " + err));
  }

  return (
    <>
      <center>
        <h1>Fill Enquiry Form</h1>
        <form onSubmit={save}>
          <input type="text" placeholder="Enter your name" onChange={hName} ref={rName} value={name} required />
          <br /><br />
          <input type="email" placeholder="Enter your email id" onChange={hEmail} ref={rEmail} value={email} required /> {/* Fixed: onChange to use hEmail */}
          <br /><br />
          <input type="number" placeholder="Enter your phone number" onChange={hPhone} ref={rPhone} value={phone} required />
          <br /><br />
          <textarea placeholder="Enter your query" rows={4} cols={30} onChange={hQuery} ref={rQuery} value={query} required />
          <br /><br />
          <input type="submit" />
        </form>
        {showMessage && <div className="message-box">{msg}</div>}
      </center>
    </>
  );
}
