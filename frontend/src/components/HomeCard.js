export default function HomeCard({content, handleCardClick}) {

  const {street_address, state, zip, sqft, beds, baths, list_price} = content;
  
  return (
    <div className="card" style={cardStyle}>
      <div className="title" style={titleStyle}>{street_address}</div>
          <div className='details' style={detailBoxStyle}>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'List Price: '}</span>
                  <span>{list_price}</span>
              </div>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'State: '}</span>
                  <span>{state}</span>
              </div>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'Zip: '}</span>
                  <span>{zip}</span>
              </div>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'Sqft: '}</span>
                  <span>{sqft}</span>
              </div>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'Beds: '}</span>
                  <span>{beds}</span>
              </div>
              <div style={detilStyle}>
                  <span style={{marginRight: '10px'}}>{'Bath: '}</span>
                  <span>{baths}</span>
              </div>
          </div>
          <div style={buttonBoxStyle}>
              <button style={buttonStyle} onClick={()=>{
                  handleCardClick(content)
              }}>Edit User</button>
          </div>
    </div>
  );
}
const titleStyle ={
  fontSize: '20px',
  fontWeight: 'bolder'

}
const cardStyle = {
  width: '200px',
  height: '300px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
  boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  margin: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start'
}

const detailBoxStyle ={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection:'column',
  marginTop: '10px',
}
const detilStyle ={
  width: '100%',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  marginTop: '5px',
}

const buttonBoxStyle ={
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  bottom: '0px'

}
const buttonStyle = {
  width: '100px',
  height: '40px',
  background: '#3670e0',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '3px',
  border: 'none',
  fontSize: '16px',
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px', 

};
