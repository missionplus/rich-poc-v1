import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={footerStyle}>
      <p>© 2024 HelloRich Pte. Ltd. All rights reserved.</p>
      <p>*Advice should be sought from a financial adviser regarding the suitability of the investment product, taking into account the specific investment objectives, financial situation or particular needs of any person in receipt of the recommendation, before the person makes a commitment to purchase the investment product.</p>
<p>Should the person choose not to do so, he should consider carefully whether the product is suitable for him. In particular, all relevant documentations pertaining to the product should be read to make an independent assessment of the appropriateness of the transaction.</p>
<p>The advertisement has not been reviewed by the Monetary Authority of Singapore, or any regulatory authority elsewhere.*</p>
<p>The data you have entered here will be used to train our bot.</p>
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