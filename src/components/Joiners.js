import React from 'react';
import {Button, Image} from 'semantic-ui-react';
import { ActionCable } from 'react-actioncable-provider';
import Flatiron from '../Img/userSmall.jpg'

const Joiners = (props) => {
    return (
      <div className="joiner-list">
          {props.joiners.map(joiner => (
            <div className="joiner" key={joiner.id} joiner={joiner}>
              {joiner.small_picture ? <Image avatar src={joiner.small_picture} /> : <Image avatar src={Flatiron}/>}
              {joiner.firstname} {joiner.lastname}
            </div>))}
      </div>
    )
};

export default Joiners;
