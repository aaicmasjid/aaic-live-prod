import React from 'react'
import ContactForm from '../ContactForm'

const Contact = () => {
  return (
    <div>
<div style={{display: 'flex', marginTop: '10vw', marginLeft: '10vw', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
<ContactForm />
</div>
<div style={{marginTop: '-1vw', marginLeft: '37vw'}}>
 Contact Mohammed Shafiuddin @ <a style={{textDecoration: 'none'}} href="tel:+13127149744">312-714-9744</a>
 </div>
</div>


  )
}

export default Contact