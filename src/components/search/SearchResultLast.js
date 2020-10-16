import React, { useEffect } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setFetched } from '../../actions/results';
import HappyList from '../lists/HappyList';
import DanceList from '../lists/DanceList';
import ModerateList from '../lists/ModerateList';
import SadList from '../lists/SadList';

function SearchResultLast(props) {
  const { result, selectedCategory, setCategory } = props;
  const { happySongs, danceSongs, sadSongs, moderateSongs } = result;
  useEffect(() => {
    props.dispatch(setFetched());
  }, [])
  return (
    <React.Fragment>
      <div className="search-buttons">
        {!_.isEmpty(happySongs) && (
          <button
            className={`${selectedCategory === 'happy' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('happy')}
          >
            Happy
          </button>
        )}
        {!_.isEmpty(sadSongs) && (
          <button
            className={`${selectedCategory === 'sad' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('sad')}
          >
            Sad
          </button>
        )}
        {!_.isEmpty(moderateSongs) && (
          <button
            className={`${selectedCategory === 'moderate' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('moderate')}
          >
            Miscellaneous
          </button>
        )}
        {!_.isEmpty(danceSongs) && (
          <button
            className={`${selectedCategory === 'dance' ? 'btn active' : 'btn'}`}
            onClick={() => setCategory('dance')}
          >
            Dance
          </button>
        )}
      </div>
      <div className={`${selectedCategory === 'happy' ? '' : 'hide'}`}>
        {happySongs && <HappyList happySongs={happySongs} />}
      </div>
      <div className={`${selectedCategory === 'moderate' ? '' : 'hide'}`}>
        {moderateSongs && <ModerateList moderateSongs={moderateSongs} />}
      </div>
      <div className={`${selectedCategory === 'sad' ? '' : 'hide'}`}>
        {sadSongs && <SadList sadSongs={sadSongs} />}
      </div>
      <div className={`${selectedCategory === 'dance' ? '' : 'hide'}`}>
        {danceSongs && <DanceList danceSongs={danceSongs} />}
      </div>
    </React.Fragment>
  );
};
export default connect()(SearchResultLast);