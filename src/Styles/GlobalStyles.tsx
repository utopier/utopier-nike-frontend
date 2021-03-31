import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    body {
        font-size:14px;
        font-familiy: 'Open Sans', sans-serif;
    }
    a {
        color: black;
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
    button{
      outline:none;
    }
    button:hover{
      opacity: 0.8;
    }
`;
