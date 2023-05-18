import { useState, } from 'react';
import { collection, doc, query, where } from 'firebase/firestore';
import { auth, firestore } from "../config/firebase";
import { Footer, Navbar, Tab, TradeCard } from "../components";
import { useCollectionDataOnce, useCollectionOnce } from 'react-firebase-hooks/firestore';

const Trades = () => {
  // States for tabs
  const [incomingSelected, setIncomingSelected] = useState(true);
  const [sentSelected, setSentSelected] = useState(false);

  const userDocRef = doc(firestore, `users/${auth.currentUser.uid}`);

  const tradesRef = collection(firestore, 'trades');
  const [incomingTradesRef] = useCollectionOnce(query(tradesRef, where('sender_ref', '==', userDocRef)));
  const [incomingTrades] = useCollectionDataOnce(query(tradesRef, where('sender_ref', '==', userDocRef)));
  const [sentTradesRef] = useCollectionOnce(query(tradesRef, where('receiver_ref', '==', userDocRef)));
  const [sentTrades] = useCollectionDataOnce(query(tradesRef, where('receiver_ref', '==', userDocRef)));

  // Onclick functions for tabs
  const displayIncoming = () => {
    if (incomingSelected !== true) {
      setIncomingSelected(true);
      setSentSelected(false);
    }
  };

  const displaySent = () => {
    if (sentSelected !== true) {
      setSentSelected(true);
      setIncomingSelected(false);
    }
  };


  return (
    <>
      <Navbar title="Trades" />
      <div className='trades-content'>
        <div className='trade-tabs'>
          <Tab id='incomingTab' onClick={() => displayIncoming()} selected={incomingSelected} tabName='Incoming Offers' />
          <Tab id='sentTab' onClick={() => displaySent()} selected={sentSelected} tabName='Sent Offers' />
        </div>
        <div id='trades'>
          {incomingSelected && incomingTrades &&
            incomingTrades.map((trade, i) =>
              <TradeCard key={i} tradeData={trade} type='incoming' tradeID={incomingTradesRef.docs[i].id}/>)
          }
          {sentSelected && sentTrades &&
            sentTrades.map((trade, i) =>
              <TradeCard key={i} tradeData={trade} type='sent' tradeID={sentTradesRef.docs[i].id}/>)
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Trades;