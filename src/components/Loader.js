import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Loader(props) {
  {/* create a div to be inserted in a DOM element that is NOT root */}
  const [node] = useState(document.createElement('div'));
  {/* loader is obviously in a different DOM element */}
  const loader = document.querySelector('#loader');

  useEffect(() => {
    loader.appendChild(node).classList.add('message');
  }, [loader, node]);

  useEffect(() => {
    {/* props.show has value true or false */}
    if (props.show) {
      loader.classList.remove('hide');
      document.body.classList.add('loader-open');
    } else {
      loader.classList.add('hide');
      document.body.classList.remove('loader-open');
    }
  }, [loader, props.show]);

  {/* props.children refers to everything that goes inside <Loader></Loader> */}
  return ReactDOM.createPortal(props.children, node);
};
export default Loader;