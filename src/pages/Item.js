import { useLocation } from 'react-router-dom';
import { Footer, Navbar } from '../components';

import { placeholderImage } from '../img';

const Item = () => {

  const location = useLocation();
  let itemDoc = JSON.parse(location.state);

  return (
    <>
      <Navbar title='Item' backArrow={true} />
      <div className='item'>
        <div className='item-img'>
          <img src={itemDoc.picture_URL} alt={placeholderImage} />
        </div>
        <h1>{itemDoc.item_name}</h1>
        <p>{itemDoc.description}</p>
      </div>
      <Footer />
    </>
  );
}

export default Item;