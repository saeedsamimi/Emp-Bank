import { Component } from "react";
import { Button } from "react-bootstrap";

class Settings extends Component {
  render() {
    return (
      <main className="w-100">
        <div className="container" style={{ maxWidth: "600px" }}>
          <Button
            variant="primary"
            onClick={() => window.history.back()}
            style={{ display: "block" }}
          >
            <i className="bi bi-arrow-left" />
          </Button>
          This is setting page
        </div>
      </main>
    );
  }
}

export default Settings;
