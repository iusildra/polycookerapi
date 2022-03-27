--
-- PostgreSQL database dump
--

-- Dumped from database version 13.6
-- Dumped by pg_dump version 13.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contains; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.contains (
    in_recipe text NOT NULL,
    the_ingredient text NOT NULL,
    quantity double precision NOT NULL,
    contained_unit text
);


ALTER TABLE public.contains OWNER TO polycooker;

--
-- Name: diets; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.diets (
    diet_name text NOT NULL
);


ALTER TABLE public.diets OWNER TO polycooker;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.ingredients (
    ingredient_name text NOT NULL,
    is_allergen boolean NOT NULL,
    ingredient_season text
);


ALTER TABLE public.ingredients OWNER TO polycooker;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.recipes (
    recipe_id text NOT NULL,
    recipe_author text,
    recipe_name text NOT NULL,
    recipe_for smallint NOT NULL,
    recipe_duration smallint,
    recipe_steps text NOT NULL,
    recipe_season text,
    recipe_type text,
    recipe_diet text,
    recipe_difficulty double precision NOT NULL,
    recipe_cost double precision NOT NULL,
    creation_date date NOT NULL,
    CONSTRAINT recipes_check CHECK (((recipe_cost >= (0)::double precision) AND (recipe_difficulty <= (5)::double precision))),
    CONSTRAINT recipes_recipe_difficulty_check CHECK (((recipe_difficulty >= (0)::double precision) AND (recipe_difficulty <= (5)::double precision))),
    CONSTRAINT recipes_recipe_duration_check CHECK ((recipe_duration > 0)),
    CONSTRAINT recipes_recipe_for_check CHECK ((recipe_for > 0))
);


ALTER TABLE public.recipes OWNER TO polycooker;

--
-- Name: seasons; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.seasons (
    season_name text NOT NULL
);


ALTER TABLE public.seasons OWNER TO polycooker;

--
-- Name: types; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.types (
    type_name text NOT NULL
);


ALTER TABLE public.types OWNER TO polycooker;

--
-- Name: units; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.units (
    unit_name text NOT NULL
);


ALTER TABLE public.units OWNER TO polycooker;

--
-- Name: users; Type: TABLE; Schema: public; Owner: polycooker
--

CREATE TABLE public.users (
    user_id text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    admin boolean NOT NULL,
    passwd text NOT NULL,
    registration date NOT NULL,
    last_login date
);


ALTER TABLE public.users OWNER TO polycooker;

--
-- Data for Name: contains; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.contains (in_recipe, the_ingredient, quantity, contained_unit) FROM stdin;
a	Rice	1000	g
aaa	Rice	750	g
aaa	Melon	250000	g
aaaa	Rice	1000	g
aaaa	Grapes	2000	g
41e81d8c-4caf-4e3f-8a42-4fb8a50c7422	Melon Vert	10	g
c78ffedd-05d4-4d9e-90ca-069a77252e9a	Melon Jaune	1000	g
\.


--
-- Data for Name: diets; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.diets (diet_name) FROM stdin;
Omnivorous
Vegetarian
Vegan
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.ingredients (ingredient_name, is_allergen, ingredient_season) FROM stdin;
Rice	f	\N
Melon	f	Summer
Grapes	f	Autumn
Melon Galina	f	Summer
Melon Vert	f	Winter
Melon Jaune	f	Summer
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.recipes (recipe_id, recipe_author, recipe_name, recipe_for, recipe_duration, recipe_steps, recipe_season, recipe_type, recipe_diet, recipe_difficulty, recipe_cost, creation_date) FROM stdin;
a	3a5efcf3-4a36-49cb-82cf-01e3f5709624	Boiled rice	4	30	Boil some water, then throw the rice in	\N	Main dish	Vegan	1	1	2022-03-26
aaa	3a5efcf3-4a36-49cb-82cf-01e3f5709624	Boiled rice whith melon	20	10	Boil some water, then throw the rice & melon in	Summer	Main dish	Vegan	1	1	2022-03-26
aaaa	3a5efcf3-4a36-49cb-82cf-01e3f5709624	Boiled rice with grapes	15	5	Boil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\nBoil some water, then throw the rice & grapes in\\n\\n	Autumn	Main dish	Vegan	1	1	2022-03-26
41e81d8c-4caf-4e3f-8a42-4fb8a50c7422	3a5efcf3-4a36-49cb-82cf-01e3f5709624	My recipe	4	4	AAA\n\nBBB\n\nCCC\nDDD\n\nEEE	\N	\N	\N	3	3.5	2022-03-26
c78ffedd-05d4-4d9e-90ca-069a77252e9a	3a5efcf3-4a36-49cb-82cf-01e3f5709624	Sliced Melon	6	6	AAAA\n\nBBBB\nCCCC\n\nDDD	Summer	Dessert	Vegan	0	0	2022-03-27
\.


--
-- Data for Name: seasons; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.seasons (season_name) FROM stdin;
Winter
Spring
Summer
Autumn
\.


--
-- Data for Name: types; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.types (type_name) FROM stdin;
Starter
Main dish
Dessert
Appetizer
Side dish
Sauce
Drink
Sweet
\.


--
-- Data for Name: units; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.units (unit_name) FROM stdin;
g
kg
ml
cl
L
d.s
t.s
pinch
handful of
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: polycooker
--

COPY public.users (user_id, email, username, admin, passwd, registration, last_login) FROM stdin;
abcd	a	a	t	azerty	2022-03-26	\N
aaaa	b	b	f	azertyuiop	2022-03-26	\N
3a5efcf3-4a36-49cb-82cf-01e3f5709624	lucas.nouguier@protonmail.com	Iusildra	t	$2a$10$vquskdzw6NIDljFWJaPDZOx5ePUHfHMs0nsfzKc0j8vliO7nFrhh.	2022-03-26	\N
\.


--
-- Name: contains contains_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_pkey PRIMARY KEY (in_recipe, the_ingredient);


--
-- Name: diets diets_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.diets
    ADD CONSTRAINT diets_pkey PRIMARY KEY (diet_name);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_name);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: seasons seasons_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.seasons
    ADD CONSTRAINT seasons_pkey PRIMARY KEY (season_name);


--
-- Name: types types_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (type_name);


--
-- Name: units units_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.units
    ADD CONSTRAINT units_pkey PRIMARY KEY (unit_name);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: contains contains_contained_unit_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_contained_unit_fkey FOREIGN KEY (contained_unit) REFERENCES public.units(unit_name) ON DELETE SET NULL;


--
-- Name: contains contains_in_recipe_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_in_recipe_fkey FOREIGN KEY (in_recipe) REFERENCES public.recipes(recipe_id) ON DELETE CASCADE;


--
-- Name: contains contains_the_ingredient_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.contains
    ADD CONSTRAINT contains_the_ingredient_fkey FOREIGN KEY (the_ingredient) REFERENCES public.ingredients(ingredient_name) ON DELETE SET NULL;


--
-- Name: ingredients ingredients_ingredient_season_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_ingredient_season_fkey FOREIGN KEY (ingredient_season) REFERENCES public.seasons(season_name) ON DELETE SET NULL;


--
-- Name: recipes recipes_recipe_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_recipe_author_fkey FOREIGN KEY (recipe_author) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: recipes recipes_recipe_diet_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_recipe_diet_fkey FOREIGN KEY (recipe_diet) REFERENCES public.diets(diet_name) ON DELETE SET NULL;


--
-- Name: recipes recipes_recipe_season_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_recipe_season_fkey FOREIGN KEY (recipe_season) REFERENCES public.seasons(season_name) ON DELETE SET NULL;


--
-- Name: recipes recipes_recipe_type_fkey; Type: FK CONSTRAINT; Schema: public; Owner: polycooker
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_recipe_type_fkey FOREIGN KEY (recipe_type) REFERENCES public.types(type_name) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

