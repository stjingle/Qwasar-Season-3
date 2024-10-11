import logo from './logo.svg';
import './App.css';

function LoremIpsum() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section className="App-section">
        <div className="section-title">
          My First Component!
        </div>
      <p className="lorem_ipsum">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu dui vitae purus faucibus rhoncus vel vel purus. Duis convallis nisi nec purus facilisis euismod a non ligula. Fusce cursus nunc eget velit egestas, ac vehicula risus pharetra. Aenean dictum felis nec maximus faucibus. In feugiat sem sed massa tincidunt pellentesque. Integer a ipsum nisi. Nunc mauris purus, ornare nec magna et, varius fermentum enim. Morbi in dui pellentesque, scelerisque est condimentum, sodales sapien. Aliquam erat metus, interdum et ligula in, sodales vestibulum eros. Cras id dolor ac lacus convallis posuere. Curabitur sit amet efficitur augue, non dapibus neque.</p>
    

      </section>
    </div>
  );
}

export default LoremIpsum;
