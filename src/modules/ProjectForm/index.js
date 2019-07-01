/*
 *  Copyright 2019 Laguro, Inc. 
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { ProjectFormView } from './view';
import { adopt } from 'react-adopt';
import { GET_CATEGORIES_ENDPOINT_NAME, getCategoriesQuery } from './queries';
import { Query } from 'react-apollo';
import {
  getComponentToRender,
  getDataFromReactAdoptProps,
} from '../../util/gqlUtils';

const Composed = adopt({
  [GET_CATEGORIES_ENDPOINT_NAME]: ({ render }) => (
    <Query query={getCategoriesQuery}>{render}</Query>
  ),
});

class ProjectForm extends React.Component {
  render() {
    return (
      <Composed>
        {props => {
          const categories =
            getDataFromReactAdoptProps({
              props,
              endpointName: GET_CATEGORIES_ENDPOINT_NAME,
            }) || [];

          const componentOnSuccess = (
            <ProjectFormView
              {...this.props}
              categories={categories.map(category => category.name)}
            />
          );
          return getComponentToRender({ props, componentOnSuccess });
        }}
      </Composed>
    );
  }
}

export default ProjectForm;
