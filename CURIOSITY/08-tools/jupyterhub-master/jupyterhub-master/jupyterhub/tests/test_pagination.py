"""tests for pagination"""
from pytest import mark
from pytest import raises
from traitlets.config import Config

from jupyterhub.pagination import Pagination


@mark.parametrize(
    "per_page, max_per_page, expected",
    [
        (20, 10, 10),
        (1000, 1000, 1000),
    ],
)
def test_per_page_bounds(per_page, max_per_page, expected):
    cfg = Config()
    cfg.Pagination.max_per_page = max_per_page
    p = Pagination(config=cfg)
    p.per_page = per_page
    p.total = 99999
    assert p.per_page == expected
    with raises(Exception):
        p.per_page = 0


@mark.parametrize(
    "page, per_page, total, expected",
    [
        (1, 10, 99, [1, 2, 3, "...", 10]),
        (2, 10, 99, [1, 2, 3, 4, "...", 10]),
        (3, 10, 99, [1, 2, 3, 4, 5, "...", 10]),
        (4, 10, 99, [1, 2, 3, 4, 5, 6, "...", 10]),
        (5, 10, 99, [1, "...", 3, 4, 5, 6, 7, "...", 10]),
        (6, 10, 99, [1, "...", 4, 5, 6, 7, 8, "...", 10]),
        (7, 10, 99, [1, "...", 5, 6, 7, 8, 9, 10]),
        (8, 10, 99, [1, "...", 6, 7, 8, 9, 10]),
        (9, 10, 99, [1, "...", 7, 8, 9, 10]),
        (1, 20, 99, [1, 2, 3, 4, 5]),
        (1, 10, 0, [1]),
        (1, 10, 1, [1]),
        (1, 10, 10, [1]),
        (1, 10, 11, [1, 2]),
        (1, 10, 50, [1, 2, 3, 4, 5]),
        (1, 10, 60, [1, 2, 3, 4, 5, 6]),
        (1, 10, 70, [1, 2, 3, 4, 5, 6, 7]),
        (1, 10, 80, [1, 2, 3, "...", 8]),
    ],
)
def test_window(page, per_page, total, expected):
    pagination = Pagination(page=page, per_page=per_page, total=total)
    assert pagination.calculate_pages_window() == expected
