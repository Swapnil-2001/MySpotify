import React, { useEffect, Suspense } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { setFetched } from '../../actions/results';

const HappyList = React.lazy(() => import('../lists/HappyList'));
const DanceList = React.lazy(() => import('../lists/DanceList'));
const ModerateList = React.lazy(() => import('../lists/ModerateList'));
const SadList = React.lazy(() => import('../lists/SadList'));

function SearchResultLast(props) {
  const { result, selectedCategory, setCategory } = props;
  const { happySongs, danceSongs, sadSongs, moderateSongs } = result;
  useEffect(() => {
    props.dispatch(setFetched());
  }, [])
  return (
    <React.Fragment>
      <div className="moodButtons__div">
        <div className="buttons__heading">
          <h1>Right now I'm in the mood for a song that is</h1>
        </div>
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
      </div>
      <div className={`${selectedCategory === 'happy' ? '' : 'hide'}`}>
        {happySongs && (
          <Suspense fallback={<div></div>}>
            <HappyList happySongs={happySongs} />
          </Suspense>
        )}
      </div>
      <div className={`${selectedCategory === 'moderate' ? '' : 'hide'}`}>
        {moderateSongs && (
          <Suspense fallback={<div></div>}>
            <ModerateList moderateSongs={moderateSongs} />
          </Suspense>
        )}
      </div>
      <div className={`${selectedCategory === 'sad' ? '' : 'hide'}`}>
        {sadSongs && (
          <Suspense fallback={<div></div>}>
            <SadList sadSongs={sadSongs} />
          </Suspense>
        )}
      </div>
      <div className={`${selectedCategory === 'dance' ? '' : 'hide'}`}>
        {danceSongs && (
          <Suspense fallback={<div></div>}>
            <DanceList danceSongs={danceSongs} />
          </Suspense>
        )}
      </div>
    </React.Fragment>
  );
};
export default connect()(SearchResultLast);