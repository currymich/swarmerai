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
import queryString from 'query-string'
import history from '../history'

export const redirect = ({
  url = '/',
  includeNewRedirectTo = false,
  includeOldSearchParams = true,
  newSearchParams = {},
}) => {
  let urlParams = {}
  if (includeOldSearchParams) {
    urlParams = queryString.parse(history.location.search)
  }
  if (includeNewRedirectTo) {
    urlParams.redirectTo = history.location.pathname
  }
  urlParams = { ...urlParams, ...newSearchParams }
  if (history.location.pathname !== url) {
    history.push(`${url}?${queryString.stringify(urlParams)}`)
  }
  window.scrollTo(0, 0)
}
