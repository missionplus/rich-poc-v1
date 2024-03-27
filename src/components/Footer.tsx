import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2024 HelloRich Pte. Ltd. All rights reserved.</p>
      <p>*HelloRich.AI  provides information and advice for educational purposes only. HelloRich.AI does not offer advisory or brokerage services, nor does it recommend or advise investors to buy or sell particular insurance policies, stocks, securities or other investments.</p>
<p>Should the person choose not to do so, he should consider carefully whether the product is suitable for him. In particular, all relevant documentations pertaining to the product should be read to make an independent assessment of the appropriateness of the transaction.</p>
<p> It does not constitute an offer, recommendation, solicitation to enter into any transaction. You should seek advice from a licensed or an exempt financial adviser on the suitability of the product for you, taking into account these factors before making a commitment to purchase any product.</p>
<p>Should the person choose not to do so,(s)he should consider carefully whether the product is suitable for them. The advertisement has not been reviewed by the Monetary Authority of Singapore, or any regulatory authority elsewhere.</p>
<p>The data you have provided will be used to train me, HelloRich.AI.</p>
    </footer>
  );
};

const footerStyle: React.CSSProperties = {
  fontSize: '8px',
  width: '100%',
  textAlign: 'center',
  padding: '10px',
  
};

export default Footer;