import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className='container'>
        <p>
          Información tomada del{' '}
          <strong>
            <a
              href='https://www.ins.gov.co/Noticias/Paginas/Coronavirus.aspx'
              target='_blank'
              rel='noopener noreferrer'
            >
              Instituto Nacional de Salud de Colombia
            </a>
          </strong>
        </p>
        <div className='copyright'>
          Sitio desarrollado por{' '}
          <a
            href='http://franyerverjel.com'
            target='_blank'
            rel='noopener noreferrer'
          >
            Franyer Verjel
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
