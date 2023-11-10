import React from 'react';
import { AppBar, Toolbar, Link } from '@mui/material';

const Header = () => {
  const headerStyle = {
    backgroundColor: '#2b2a29',
  };

  return (
    <AppBar position="sticky" style={headerStyle}>
      <Toolbar>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img src="https://seeklogo.com/images/C/c6-bank-logo-41EC9D4C73-seeklogo.com.png" alt='c6 Bank - Logotipo' style={{ maxWidth: '140px', maxHeight: '100%' }} />
        </div>        
        <Link href="/">Início</Link>
        <Link href="#">Produtos</Link>
        <Link href="#">Seu Bolso</Link>
        <Link href="/blog">Postagens</Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
