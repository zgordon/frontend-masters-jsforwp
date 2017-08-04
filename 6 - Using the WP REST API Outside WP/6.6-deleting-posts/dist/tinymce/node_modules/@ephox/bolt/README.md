# Bolt

Bolt is a javascript module system, inspired by, but at this
point (intentionally) not compatible with the AMD specification.
Bolt consists of a runtime framework, compiler and testing tools.

The general philosophy is quick, clean and easy.

Bolt is open source under a [BSD style license](https://raw.github.com/ephox/bolt/master/LICENCE).


# Getting Bolt

<pre>
npm install -g @ephox/bolt
</pre>

This will add the `bolt` command to your path.

## Source

Bolt is split into several repositories to assist in structuring the code, however you can
build bolt by just cloning this repository and running make. This will pull down the
required git repositories and produce a local build.

<pre>
git clone https://github.com/ephox/bolt.git
cd bolt
make
</pre>

A distribution tar can then be found in gen/dist/bolt-local.tar.gz, or unpacked in
gen/image/bolt-local.


# Getting Started

Checkout the [github wiki](https://github.com/ephox/bolt/wiki/Home) for some basic documentation on getting started.
