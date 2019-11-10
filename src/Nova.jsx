import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { v4 } from 'uuid';

const { window, CustomEvent, document } = global;

class Nova extends Component {
  constructor(props) {
    super(props);
    this.uuid = v4();
    this.placeholder = React.createRef();
  }

  componentDidMount() {
    if (window !== 'undefined') {
      const id = this.placeholder.current.getAttribute('data-hypernova-id');
      const { name } = this.props;
      const customEvent = new CustomEvent('NovaMount', { detail: { id, name } });
      document.dispatchEvent(customEvent);
    }
  }

  componentDidUpdate() {
    if (window !== 'undefined') {
      const id = this.placeholder.current.getAttribute('data-hypernova-id');
      const { name } = this.props;
      const customEvent = new CustomEvent('NovaMount', { detail: { id, name } });
      document.dispatchEvent(customEvent);
    }
  }

  render() {
    const { name, data } = this.props;
    return (
      <>
        <div
          ref={this.placeholder}
          data-hypernova-key={name}
          data-hypernova-id={this.uuid}
          dangerouslySetInnerHTML={{ __html: '' }} // eslint-disable-line react/no-danger
        />
        <script
          type="application/json"
          data-hypernova-key={name}
          data-hypernova-id={this.uuid}
          dangerouslySetInnerHTML={{ __html: `<!--${JSON.stringify(data)}-->` }} // eslint-disable-line react/no-danger
        />
      </>
    );
  }
}

Nova.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({}).isRequired,
};

export default Nova;
