import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return (
  <Wrapper>
      <h2 className="common-heading">Contact page</h2>
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.011261507866!2d75.83082077450578!3d26.934857459140215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db139cdfd62cb%3A0x62a303aff3329b3c!2sJorawar%20Singh%20Gate%2C%20Amer%20Rd%2C%20Chokdi%20Gangapol%2C%20Jaipur%2C%20Rajasthan%20302002!5e0!3m2!1sen!2sin!4v1713008148604!5m2!1sen!2sin"
  width={'100%'}
  height={350}
  style={{ border: 0}}
  allowFullScreen=""
  loading="lazy"

  referrerPolicy="no-referrer-when-downgrade"
/>
 <div className='container'>
     <div className='contact-form'>
        <form action='https://formspree.io/f/mzbnkoed' method='post' className="contact-inputs">
           <input type='text' placeholder="username" name='userName' required  autoCompete='off' />
           <input type='email' placeholder="email" name='email' required  autoCompete='off' />
           <textarea placeholder="enter your message" cols={30} rows={10} required autoComplete="off" name='messages'/>
           <input type='submit' value='sent'/>           
        </form>
     </div>
 </div>
  </Wrapper>
  );
};

export default Contact;