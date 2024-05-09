import { useContext, useState } from 'react';
import { UserContext } from '../../../../../context/UserContext';
import generalize from '../../../../../css/generalize.module.css';
import { createEdition } from '../../../../../helpers/dataAPI';
import style from '../../../css/createSection.module.css';
import { isFieldEmpty } from '../../../../../helpers/inputValidations';
import { toast } from 'react-hot-toast';


export const CreateProductEditionInfo = ({getListProductKey}) => {
  const { user, language } = useContext(UserContext);
  const [inputValues, setInputValues] = useState({
    name: "",
  });
  const productEditionTab = language.adminPanelPage.productEditionTab;
  const warnings = language.warnings;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const saveFeatureInfo = async () => {
    if (validations()) {
      return;
    }
    try {
      await createEdition(user.accessToken, inputValues.name);
      getListProductKey();
      toast.success(warnings.success.createProductEdition);

    } catch (err) {
      toast.error(warnings.error.productEditionCreate);

    }
  };

  const validations = () => {
    if (isFieldEmpty(inputValues.name)) {
      toast.error(warnings.error.nameEmpty)
      return true
    }


    return false;
  }

  return (
    <div className={`${style.newsInfoContainer} `}>
      <div>
        <div className={`${style.title} `}>
          <h1 className={`${style.h1} `}>{productEditionTab.create.title}</h1>
          <div className={`${style.buttonActions} `}>
            <button
              className={`${style.button} ${generalize.buttonStyle_active}`}
              onClick={saveFeatureInfo}
            >
              {productEditionTab.publishButton}
            </button>
          </div>
        </div>
      </div>

      <section className={`${style.newsInfo} `}>
        <article className={`${style.inputInfoSection} `}>
          <label className={`${style.inputTitle} `}>{productEditionTab.create.fields.name}</label>
          <input
            type="text"
            className={`${style.inputNewsSearch} `}
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </article>
      </section>
    </div>
  );
};
