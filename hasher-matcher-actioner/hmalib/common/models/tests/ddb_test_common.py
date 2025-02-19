# Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved

import os
from moto import mock_dynamodb2
import boto3
import typing as t
from contextlib import contextmanager


class DynamoDBTableTestBase:
    # Note, the MRO requires this be the first class to inherit. _before_
    # unittest.TestCase. Classmethods are not invoked if TestCase is first in
    # MRO.

    table = None

    def get_table(self):
        return self.__class__.table

    @contextmanager
    def fresh_dynamodb(self):
        # Code to acquire resource, e.g.:
        self.__class__.setUpClass()
        try:
            yield
        finally:
            self.__class__.tearDownClass()

    @staticmethod
    def mock_aws_credentials():
        """
        Mocked AWS Credentials for moto.
        (likely not needed based on local testing but just incase)
        """
        os.environ["AWS_ACCESS_KEY_ID"] = "testing"
        os.environ["AWS_SECRET_ACCESS_KEY"] = "testing"
        os.environ["AWS_SECURITY_TOKEN"] = "testing"
        os.environ["AWS_SESSION_TOKEN"] = "testing"

    @classmethod
    def setUpClass(cls):
        cls.mock_aws_credentials()
        cls.mock_dynamodb2 = mock_dynamodb2()
        cls.mock_dynamodb2.start()
        cls.create_mocked_table()

    @classmethod
    def tearDownClass(cls):
        cls.mock_dynamodb2.stop()

    @classmethod
    def create_mocked_table(cls):
        dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
        cls.table = dynamodb.create_table(**cls.get_table_definition())

    @classmethod
    def get_table_definition(cls) -> t.Any:
        """
        Not really t.Any. I'm being lazy. Pass a dict which is kwargs for
        dynamodb.create_table.
        """
        raise NotImplementedError
