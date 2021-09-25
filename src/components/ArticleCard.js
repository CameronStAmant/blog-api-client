import { Link } from 'react-router-dom';
import baseUrl from '../const';

function ArticleCard(props) {
  return (
    <Link to={'/posts/' + props.post.id}>
      <div className="grid auto-rows-post">
        <div className="overflow-hidden h-postCoverPhoto">
          <img
            className="w-full rounded-tl-md rounded-tr-md"
            src={
              props.post ? baseUrl + '/uploads/' + props.post.coverPhoto : ''
            }
            alt="Post Cover"
          />
        </div>
        <div className="text-3xl font-semibold flex-grow px-4 rounded-bl-md rounded-br-md bg-white -mt-1 pb-1">
          {props.post.title}
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
