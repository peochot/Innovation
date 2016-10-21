import { reduxForm, reset, change as changeFieldValue } from 'redux-form';
import {apply} from '../actions';
const mapStateToProps = ({selectedJob,jobs,letters}) => ({auth,jobs});

const mapDispatchToProps = dispatch => ({
  apply :(body) => dispatch(apply(body))
});

class ApplyForm extends Component {
  render() {

    return (
      <form onSubmit={this.props.handleSubmit(this.props.apply)}>
        <Input s={4} placeholder="Cover letter" { ...size } />
        <ColorInput s={4} action={ colorObj => this.props.changeFieldValue('ApplyForm', 'color', colorObj.hex) } />
        
       <RaisedButton type="submit" label="submit"/>
     </form>
     <form onSubmit={handleSubmit}>
      <div>
        <label>Letter template</label>
        <div>
          <Field name="favoriteColor" component="select">
            <option></option>
            <option value="ff0000">Red</option>
            <option value="00ff00">Green</option>
            <option value="0000ff">Blue</option>
          </Field>
        </div>
      </div>
      <div>
        <label>Letter content</label>
        <div>
          <Field name="notes" component="textarea"/>
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addFurniture, changeFieldValue }, dispatch);
}
export default reduxForm({
  form: 'ApplyForm',
  fields: ['itemName', 'price', 'description', 'url', 'size', 'color'],
}, mapStateToProps, mapDispatchToProps)(ApplyForm);
