// Copyright 2018 The Casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Enforcer } from '../src/enforcer';

function testEnforce(e: Enforcer, sub: string, obj: string, act: string, res: boolean): void {
  expect(e.enforce(sub, obj, act)).toBe(res);
}

test('testBasicModel', () => {
  const e = new Enforcer('examples/basic_model.conf', 'examples/basic_policy.csv');

  testEnforce(e, 'alice', 'data1', 'read', true);
  testEnforce(e, 'alice', 'data1', 'write', false);
  testEnforce(e, 'alice', 'data2', 'read', false);
  testEnforce(e, 'alice', 'data2', 'write', false);
  testEnforce(e, 'bob', 'data1', 'read', false);
  testEnforce(e, 'bob', 'data1', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', true);
});

test('testBasicModelNoPolicy', () => {
  const e = new Enforcer('examples/basic_model.conf');

  testEnforce(e, 'alice', 'data1', 'read', false);
  testEnforce(e, 'alice', 'data1', 'write', false);
  testEnforce(e, 'alice', 'data2', 'read', false);
  testEnforce(e, 'alice', 'data2', 'write', false);
  testEnforce(e, 'bob', 'data1', 'read', false);
  testEnforce(e, 'bob', 'data1', 'write', false);
  testEnforce(e, 'bob', 'data2', 'read', false);
  testEnforce(e, 'bob', 'data2', 'write', false);
});