import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../form';
import _ from 'lodash';

const ComponentRepeater = ({ children }) => {
  const [instances, setInstances] = useState({});

  useEffect(() => {
    addInstance();
  }, []);

  const addInstance = () => {
    const uniqueId = _.uniqueId();
    const newInstance = (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'center',
        }}>
        {React.cloneElement(children)}
        <PrimaryButton
          label={`Remove instance ${uniqueId}`}
          size="small"
          onClick={() => removeInstance(uniqueId)}
        />
      </div>
    );
    setInstances(prevInstances => ({
      ...prevInstances,
      [uniqueId]: newInstance,
    }));
  };

  const removeInstance = id => {
    setInstances(prevInstances => {
      const instancesClone = { ...prevInstances };
      delete instancesClone[id];
      return instancesClone;
    });
  };

  return (
    <div>
      <PrimaryButton
        label={`Add instance`}
        size="large"
        onClick={addInstance}
      />
      {instances &&
        Object.keys(instances).map(key => (
          <React.Fragment key={key}>{instances[key]}</React.Fragment>
        ))}
    </div>
  );
};

export { ComponentRepeater };
