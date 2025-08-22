import { Link } from 'react-router-dom';
import './pageNotFound.css';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1>Page not found</h1>
          <p>
            Hmm, we can't seem to find the page you're looking for.
          </p>
          <div className="error-code">Error 404</div>
          <p className="suggestions">
            Here are some helpful links instead:
          </p>
          <div className="helpful-links">
            <Link to="/home" className="btn-primary">Go to Home</Link>
            <Link to="/profile" className="btn-secondary">View Profile</Link>
          </div>
        </div>
        <div className="not-found-image">
          <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <path d="M156.2,170.9c0-32.2,26.1-58.3,58.3-58.3c32.2,0,58.3,26.1,58.3,58.3c0,32.2-26.1,58.3-58.3,58.3 C182.3,229.2,156.2,203.1,156.2,170.9z" fill="#0a66c2" opacity="0.1"/>
            <path d="M328.6,220.3c-39.4,0-74.4-25.2-87-62.5h-0.4c11.3-5.1,19.2-16.4,19.2-29.7c0-18-14.6-32.5-32.5-32.5 s-32.5,14.6-32.5,32.5c0,13.9,8.7,25.8,21,30.4c-4.8,14.8-13.2,28.4-24.5,39.6c-16.8,16.8-39.1,26.1-62.9,26.1v14 c27.2,0,52.7-10.6,72-29.8c9.2-9.2,16.7-19.5,22.4-30.5c15.6,30.1,47.1,50.8,83.2,50.8c8.5,0,16.7-1.1,24.5-3.2l-6.7-12.9 C339.1,219.9,333.8,220.3,328.6,220.3z M206.9,128.1c10.4,0,18.9,8.5,18.9,18.9c0,10.4-8.5,18.9-18.9,18.9s-18.9-8.5-18.9-18.9 C188,136.6,196.5,128.1,206.9,128.1z" fill="#0a66c2"/>
            <circle cx="350" cy="150" r="25" fill="#0a66c2" opacity="0.3"/>
            <circle cx="450" cy="180" r="40" fill="#0a66c2" opacity="0.2"/>
            <path d="M437.2,235.9c0-5.8-4.7-10.5-10.5-10.5c-5.8,0-10.5,4.7-10.5,10.5c0,5.8,4.7,10.5,10.5,10.5 C432.5,246.4,437.2,241.7,437.2,235.9z" fill="#0a66c2"/>
            <text x="200" y="300" font-family="Arial" font-size="100" font-weight="bold" fill="#0a66c2">404</text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
